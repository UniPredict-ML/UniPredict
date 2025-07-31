import pandas as pd
import re

# Load the CSV file
file_path = 'cop_2022.csv'  # Replace with your CSV file path
df = pd.read_csv(file_path)

# Step 1: Identify columns to drop (those containing '/' or '[]')
columns_to_drop = [col for col in df.columns if '/' in col or '[]' in col]
df = df.drop(columns=columns_to_drop)

# Step 2: Clean column names
def clean_column_name(column_name):
    # Remove content inside '[]' and the brackets
    base_name = re.sub(r'\[.*?\]', '', column_name)
    # Extract content inside '()' and remove the parentheses
    university_match = re.search(r'\((.*?)\)', base_name)
    if university_match:
        university = university_match.group(1)  # Extract the text inside ()
        base_name = re.sub(r'\(.*?\)', '', base_name).strip()  # Remove the entire () section
        # Combine base name with university name
        cleaned_name = f"{base_name.strip()} {university}".strip()
    else:
        cleaned_name = base_name.strip()
    # Remove '*' and '#'
    cleaned_name = cleaned_name.replace('*', '').replace('#', '')
    # Strip extra whitespace
    cleaned_name = cleaned_name.strip()
    return cleaned_name

# Apply cleaning to all column names
df.columns = [clean_column_name(col) for col in df.columns]

# Step 3: Filter columns to keep only those containing 'Arts', 'Institute', or 'University'
keywords = ['Arts', 'Institute', 'University', 'DISTRICT']
columns_to_keep = [col for col in df.columns if any(keyword in col for keyword in keywords)]
df = df[columns_to_keep]

# Step 4: Save the modified DataFrame to a new CSV file
df.to_csv(file_path, index=False)

# Optional: Display the first few rows to verify
print(df.head())
print("Updated column names:", df.columns.tolist())
