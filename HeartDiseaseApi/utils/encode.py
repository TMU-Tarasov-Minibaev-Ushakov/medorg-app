import pandas as pd

def encode(categorical_cols: list,
           df: pd.DataFrame,
           label_encoders) -> pd.DataFrame:
    encode_df = df
    for col in categorical_cols:
        encode_df[col] = label_encoders[col].transform(encode_df[col])
        return df