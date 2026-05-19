from config.db import db

def get_nurse_leaves(
    nurse_id,
    month=None
):

    query = {
        "nurse_id": nurse_id
    }

    if month:
        query["month"] = month

    leaves = list(
        db.nurse_leaves.find(
            query,
            {"_id": 0}
        )
    )

    return leaves