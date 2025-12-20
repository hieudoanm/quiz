import csv
import json
from pathlib import Path

CSV_DIR = Path("csv")
JSON_DIR = Path("json")

JSON_DIR.mkdir(exist_ok=True)

for csv_file in CSV_DIR.glob("*.csv"):
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

    json_file = JSON_DIR / f"{csv_file.stem}.json"

    with json_file.open("w", encoding="utf-8") as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)

    print(f"✅ Converted {csv_file.name} → {json_file.name}")

print("🎉 All CSV files converted successfully.")
