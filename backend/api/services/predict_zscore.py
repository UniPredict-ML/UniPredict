import os
from api.models.zscore import AccessibleDegrees, PredictZScoreInput
import pandas as pd
import joblib

def get_top_5_accessible_degrees(data: AccessibleDegrees)->list:
    """
    Find top 5 degrees that a candidate can get admitted to based on their z-score.
    
    Args:
        user_z_score (float): The candidate's z-score
        stream (str): The stream name (e.g., "biological science")
        district (str): The district name (e.g., "Colombo")
    
    Returns:
        list: List of dictionaries containing degree info and predicted cutoffs
    """
    try:
        # Load the dataset
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        CSV_PATH = os.path.join(BASE_DIR, 'processed_datasets', 'final_dataset.csv')
        training_data = pd.read_csv(CSV_PATH)
        
        # Normalize inputs
        stream = data.stream.lower().strip()
        district = data.district.lower().strip()
        
        # Get all unique degrees for the given stream and district
        stream_district_data = training_data[
            (training_data['stream'].str.lower().str.strip() == stream) & 
            (training_data['District'].str.lower().str.strip() == district)
        ]
        
        if stream_district_data.empty:
            print(f"No data found for stream '{stream}' in district '{district}'")
            return []
        
        # Get unique degrees
        unique_degrees = stream_district_data['degree'].str.upper().str.strip().unique()
        
        print(f"!!Found {len(unique_degrees)} degrees for {stream} stream in {district} district")
        print("Getting predictions for all of them now...")
        
        accessible_degrees = []
        
        # Predict z-score cutoff for each degree
        for degree in unique_degrees:
            predicted_cutoff = predict(degree, stream, district)
            
            if predicted_cutoff is not None:
                # Check if candidate's z-score is higher than the predicted cutoff
                if data.user_z_score >= predicted_cutoff:
                    accessible_degrees.append({
                        'degree': degree,
                        'predicted_cutoff': predicted_cutoff,
                        'margin': data.user_z_score - predicted_cutoff  # How much above the cutoff
                    })
            else:
                print(f"{degree}: Could not predict cutoff")
        
        # Sort by predicted cutoff in descending order (highest cutoff first = most competitive/prestigious)
        accessible_degrees.sort(key=lambda x: x['predicted_cutoff'], reverse=True)
        
        # Return top 5
        top_5 = accessible_degrees[:5]
        
        print("\n" + "=" * 80)
        print(f"TOP 5 DEGREES YOU CAN GET INTO (Your Z-Score: {data.user_z_score})")
        print("=" * 80)
        
        if not top_5:
            print(":( Unfortunately, no degrees found that you can get into with your current z-score.")
            print("Consider retaking the exam or exploring other streams/districts.")
        else:
            for i, degree_info in enumerate(top_5, 1):
                print(f"{i}. {degree_info['degree']}")
                print(f"Predicted Cutoff: {degree_info['predicted_cutoff']:.4f}")
                print(f"Your Margin: +{degree_info['margin']:.4f}")
                print()
        
        return top_5
        
    except Exception as e:
        print(f"Error in getting accessible degrees: {str(e)}")
        return []


def predict(degree, stream, district):
    """
    Predict z-score cutoff for a given degree, stream, and district.
    Now includes validation to ensure inputs exist in training data.
    
    Args:
        degree (str): The degree name (e.g., "MEDICINE University of Colombo")
        stream (str): The stream name (e.g., "biological science") 
        district (str): The district name (e.g., "Colombo")
    
    Returns:
        float: Predicted z-score cutoff, or None if inputs are invalid
    """
    try:
        # Load the datasets first to validate inputs
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        CSV_PATH = os.path.join(BASE_DIR, 'processed_datasets', 'final_dataset.csv')
        CSV_PATH2 = os.path.join(BASE_DIR, 'processed_datasets', 'final_dataset_engineered_encoded.csv')
        training_data = pd.read_csv(CSV_PATH)

        final_dataset = pd.read_csv(CSV_PATH2)
        
        # Normalize inputs to match the data format
        stream = stream.lower().strip()
        district = district.lower().strip()
        degree = degree.upper().strip()
        
        # VALIDATION: Check if inputs exist in training data
        available_degrees = set(training_data['degree'].str.upper().str.strip())
        available_streams = set(training_data['stream'].str.lower().str.strip())
        available_districts = set(training_data['District'].str.lower().str.strip())
        
        # Validate degree
        if degree not in available_degrees:
            print(f"ERROR: Degree '{degree}' not found in training data.")
            print(f"Available degrees containing your search term:")
            matching_degrees = [d for d in available_degrees if any(word in d for word in degree.split())]
            for d in sorted(matching_degrees)[:5]:
                print(f"   - {d}")
            return None
            
        # Validate stream
        if stream not in available_streams:
            print(f"ERROR: Stream '{stream}' not found in training data.")
            print(f"Available streams: {sorted(available_streams)}")
            return None
            
        # Validate district (with partial matching)
        if district not in available_districts:
            print(f"!WARNING: District '{district}' not found in training data.")
            # Try partial matching
            matching_districts = [d for d in available_districts if district in d or d in district]
            if matching_districts:
                district = matching_districts[0]
                print(f"Using closest match: '{district}'")
            else:
                print(f"Available districts: {sorted(available_districts)}")
                return None
        
        # Load the model after validation passes
        MODEL_PATH = os.path.join(BASE_DIR, 'model', 'model.joblib')
        lgbm = joblib.load(MODEL_PATH)
        
        # Filter performance data for the given stream and district
        stream_district_perf = training_data[
            (training_data['stream'] == stream) & 
            (training_data['District'] == district)
        ]
        
        if stream_district_perf.empty:
            # If no exact match, try to find data for the stream across all districts
            stream_perf = training_data[training_data['stream'] == stream]
            if stream_perf.empty:
                raise ValueError(f"No performance data found for stream: {stream}")
            
            # Use the most recent data across all districts for this stream
            latest_year = stream_perf['year'].max()
            latest_data = stream_perf[stream_perf['year'] == latest_year]
            
            # Use average performance across districts
            latest_year_perf = {
                'students_sat': latest_data['students_sat'].mean(),
                'students_passed': latest_data['students_passed'].mean()
            }
            print(f"! Using average performance across all districts for {stream}")
        else:
            # Get the most recent data for this specific stream and district
            latest_year = stream_district_perf['year'].max()
            latest_data = stream_district_perf[stream_district_perf['year'] == latest_year]
            latest_year_perf = {
                'students_sat': latest_data['students_sat'].iloc[0],
                'students_passed': latest_data['students_passed'].iloc[0]
            }
        
        # Get the minimum year from the original dataset for time_index calculation
        min_year = training_data['year'].min()
        
        # Create prediction dataframe
        new_data = pd.DataFrame({
            'District': [district],
            'stream': [stream], 
            'degree': [degree],
            'time_index': [2024 - min_year],  # Using 2024 as prediction year
            'pass_rate': [latest_year_perf['students_passed'] / max(latest_year_perf['students_sat'], 1)]
        })
        
        # One-Hot Encoding to match training data format
        categorical_cols = ['District', 'stream', 'degree']
        new_data_encoded = pd.get_dummies(new_data, columns=categorical_cols, drop_first=True)
        
        # Clean column names to match training data
        new_data_encoded.columns = new_data_encoded.columns.str.replace(r'[\"\[\]\{\},:]', '', regex=True)
        
        # Get the feature columns from the training data
        X_train_columns = final_dataset.drop(columns=['z-score_cutoff']).columns.tolist()
        
        # Reindex to match training data columns (fill missing columns with 0)
        new_data_encoded = new_data_encoded.reindex(columns=X_train_columns, fill_value=0)
        
        # Check if this combination actually existed in training
        original_combo = training_data[
            (training_data['degree'].str.upper().str.strip() == degree) &
            (training_data['stream'].str.lower().str.strip() == stream) &
            (training_data['District'].str.lower().str.strip() == district)
        ]
        
        # Make prediction
        prediction = lgbm.predict(new_data_encoded)
        
        return prediction[0]
        
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return None