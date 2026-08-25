import pandas as pd
import json


INPUT_FILE = "flowers.xlsx"
OUTPUT_FILE = "flowers.json"


df = pd.read_excel(INPUT_FILE)


required_columns = [
    "Flower Name",
    "Fact",
    "Bonus",
    "Image Link",
    "Van Gogh Image Link",
    "Date"
]


for column in required_columns:

    if column not in df.columns:

        raise ValueError(
            f"Missing column: {column}"
        )


# Replace Excel NaN values with empty strings

df = df.fillna("")


flowers = df[
    required_columns
].to_dict(
    orient="records"
)


with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        flowers,
        file,
        ensure_ascii=False,
        indent=4
    )


print(
    f"Created {OUTPUT_FILE} "
    f"with {len(flowers)} flowers."
)