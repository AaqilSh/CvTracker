from typing import List, Tuple
from keybert import KeyBERT
from sentence_transformers import SentenceTransformer

_kw_model = KeyBERT()
_emb_model = SentenceTransformer("all-MiniLM-L6-v2")

def extract_keywords(text: str, top_n: int = 20) -> List[str]:
    return [kw for kw, _ in _kw_model.extract_keywords(text, top_n=top_n)]

def match_score(resume_text: str, jd_text: str) -> Tuple[float, List[str]]:
    resume_kw = set(extract_keywords(resume_text))
    jd_kw = set(extract_keywords(jd_text))
    matched = resume_kw & jd_kw
    missing = jd_kw - resume_kw

    emb_resume = _emb_model.encode(resume_text, convert_to_tensor=True)
    emb_jd = _emb_model.encode(jd_text, convert_to_tensor=True)
    sim = float(util.cos_sim(emb_resume, emb_jd)[0][0])

    kw_ratio = len(matched) / max(len(jd_kw), 1)
    score = round((kw_ratio + sim) / 2 * 100, 2)

    return score, list(missing)