from keybert import KeyBERT
from sentence_transformers import SentenceTransformer

_kw_model = KeyBERT()
_emb_model = SentenceTransformer("all-MiniLM-L6-v2")