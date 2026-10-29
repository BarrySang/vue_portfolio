import os
from pathlib import Path

def bundle_src_files(src_dir="src", output_file="bundled_project_code.txt"):
    src_path = Path(src_dir)
    
    if not src_path.exists():
        print(f"Error: The directory '{src_dir}' does not exist in the project root.")
        return

    output_path = Path(output_file)
    
    print(f"Bundling files from '{src_dir}/' into '{output_file}'...")
    
    with open(output_path, "w", encoding="utf-8") as outfile:
        # Recursively find all files in the src directory
        for file_path in sorted(src_path.rglob("*")):
            # Process only files (skip directories)
            if file_path.is_file():
                # Avoid bundling the output file itself if it's created inside src
                if file_path.resolve() == output_path.resolve():
                    continue
                
                # Compute relative path to maintain folder structure (e.g., components/Button.vue)
                relative_path = file_path.relative_to(src_path.parent)
                display_path = str(relative_path).replace("\\", "/")
                
                # Write a clear delimiter header for each file
                outfile.write(f"\n{'=' * 80}\n")
                outfile.write(f"FILE: {display_path}\n")
                outfile.write(f"{'=' * 80}\n\n")
                
                try:
                    # Read and append file contents
                    with open(file_path, "r", encoding="utf-8") as infile:
                        outfile.write(infile.read())
                    outfile.write("\n\n")
                except Exception as e:
                    outfile.write(f"[Error reading file: {e}]\n\n")
                    
    print(f"Successfully created: {output_file}")

if __name__ == "__main__":
    bundle_src_files()
