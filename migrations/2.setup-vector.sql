CREATE OR REPLACE FUNCTION match_transactions (
    query_embedding VECTOR(768),
    match_threshold FLOAT,
    match_count INT
)

RETURNS TABLE (
    id UUID,
    type TEXT,
    category TEXT,
    amount NUMERIC,
    description TEXT,
    date DATE,
    user_id UUID,
    similarity FLOAT
)

LANGUAGE sql STABLE
AS $$
    SELECT
        transactions.id,
        transactions.type,
        transactions.category,
        transactions.amount,
        transactions.description,
        transactions.date,
        transactions.user_id,
        1 - (transactions.embedding <=> query_embedding) AS similarity
    FROM transactions
    WHERE 1 - (transactions.embedding <=> query_embedding) > match_threshold
    ORDER BY transactions.embedding <=> query_embedding
    LIMIT match_count
$$;