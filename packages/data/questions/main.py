import csv
import json
from pathlib import Path

CSV_DIR = Path("csv")
JSON_DIR = Path("json")

total_files = 0

for csv_file in CSV_DIR.rglob("*.csv"):
    total_files += 1

    # Preserve subfolder structure
    relative_path = csv_file.relative_to(CSV_DIR)
    json_file = (JSON_DIR / relative_path).with_suffix(".json")

    # Ensure target folder exists
    json_file.parent.mkdir(parents=True, exist_ok=True)

    questions = []

    with csv_file.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)

        for row in reader:
            question = {
                "question": row["question"],
                "answers": {
                    "red": row["red"],
                    "yellow": row["yellow"],
                    "blue": row["blue"],
                    "green": row["green"],
                },
                "correct": row["correct"],
            }
            questions.append(question)

    with json_file.open("w", encoding="utf-8") as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)

    print(f"✅ Converted {csv_file} → {json_file}")

print(f"\n🎉 All CSV files converted successfully.")
print(f"📁 Total files processed: {total_files}")
