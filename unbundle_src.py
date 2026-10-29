import re
from pathlib import Path

def unbundle_files(input_file="updated_bundled_project_code.txt"):
    input_path = Path(input_file)
    
    if not input_path.exists():
        print(f"Error: The file '{input_file}' does not exist in the project root.")
        return

    print(f"Reading updates from '{input_file}'...")
    content = input_path.read_text(encoding="utf-8")

    # Regex pattern matching the 80-equals header and capturing file path + content
    pattern = r"={80}\nFILE:\s*(.*?)\n={80}\n\n(.*?)(?=\n={80}\nFILE:|$)"
    matches = re.findall(pattern, content, re.DOTALL)

    if not matches:
        print("Error: No file sections found. Make sure the format matches the bundled output.")
        return

    count = 0
    for file_path_str, file_content in matches:
        file_path = Path(file_path_str.strip())
        
        # Ensure parent directories (like subfolders inside src) exist
        file_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Clean up any trailing spacing issues while preserving proper newlines
        cleaned_content = file_content.rstrip("\r\n") + "\n"
        
        # Completely rewrite the file with the updated content
        file_path.write_text(cleaned_content, encoding="utf-8")
        print(f"Rewritten: {file_path}")
        count += 1

    print(f"Successfully updated {count} files from '{input_file}'.")

if __name__ == "__main__":
    unbundle_files()
