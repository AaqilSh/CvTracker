from keybert import KeyBERT
from sentence_transformers import SentenceTransformer

_kw_model = KeyBERT()
_emb_model = SentenceTransformer("all-MiniLM-L6-v2")

def extract_keywords(text: str, top_n: int = 20) -> List[str]:
    return [kw for kw, _ in _kw_model.extract_keywords(text, top_n=top_n)]
