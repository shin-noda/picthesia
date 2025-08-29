import React, { useEffect, useState } from "react";

// Add cache and setCache to props
interface WordDefinitionProps {
  word: string;
  cache: Record<string, string | null>;
  setCache: (word: string, def: string) => void;
}

const WordDefinition: React.FC<WordDefinitionProps> = ({ word, cache, setCache }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cache[word] !== undefined) return; // already cached

    const fetchDefinition = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();
        if (Array.isArray(data) && data[0]?.meanings?.[0]?.definitions?.[0]?.definition) {
          setCache(word, data[0].meanings[0].definitions[0].definition);
        } else {
          setCache(word, "No definition found.");
        }
      } catch (err) {
        console.error("Error fetching definition:", err);
        setCache(word, "No definition found.");
      } finally {
        setLoading(false);
      }
    };

    fetchDefinition();
  }, [word, cache, setCache]);

  if (loading) return <p className="text-xs text-gray-500 mt-1">Fetching definition…</p>;
  if (cache[word] === undefined) return null;

  return <p className="text-xs text-gray-700 mt-1 italic">{cache[word]}</p>;
};

export default WordDefinition;
