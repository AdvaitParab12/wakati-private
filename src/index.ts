import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { fleschKincaid } from "flesch-kincaid";
import rs from "text-readability";

const app = new Hono();

const defaultWPM = 238;
const minWPM = 50; // Minimum allowable WPM
const maxWPM = 1000; // Maximum allowable WPM

app.use(logger());
app.use(cors());

function calcSpeed(text: string, wpm: number) {
  const charCount = text.replace(/\s+/g, "").length;
  const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
  const wordCount = text.split(/\s+/).length;
  const seconds = (wordCount / wpm) * 60;
  const minutes = seconds / 60;
  return {
    wpm,
    charCount,
    wordCount,
    sentenceCount,
    seconds: Number(seconds.toFixed(2)),
    minutes: Number(minutes.toFixed(2)),
  };
}

function countSyllables(word: string): number {
  const normalizedWord = word.toLowerCase();
  const vowelGroups = normalizedWord.match(/[aeiouy]+/g);
  if (!vowelGroups) return 0;
  let syllableCount = vowelGroups.length;
  if (normalizedWord.endsWith("e")) {
    syllableCount--;
  }
  return Math.max(syllableCount, 1);
}

function validateWPM(wpm: number): number {
  if (isNaN(wpm) || wpm < minWPM || wpm > maxWPM) {
    throw new Error(`WPM must be a number between ${minWPM} and ${maxWPM}.`);
  }
  return wpm;
}

function countAndSortKeywords(paragraph: string): [string, number][] {
  const words = paragraph
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  const keywordCount: { [word: string]: number } = {};
  for (const word of words) {
    if (word.length >= 3) {
      keywordCount[word] = (keywordCount[word] || 0) + 1;
    }
  }

  return Object.entries(keywordCount).sort(
    ([, countA], [, countB]) => countB - countA
  );
}

app.get("/status", (c) => {
  return c.json({ message: "API is active" });
});

app.get("/", (c) => {
  const text = c.req.query("text");
  const wpmQuery = c.req.query("wpm");

  if (!text) {
    return c.json({ message: "Please provide text" }, 400);
  }

  try {
    const wpm = wpmQuery ? validateWPM(Number(wpmQuery)) : defaultWPM;

    // Speed calculation
    const speedResult = calcSpeed(text, wpm);

    // Keyword analysis
    const sortedKeywords = countAndSortKeywords(text);

    // Readability calculation
    const sentences = text.match(/[^.!?]+[.!?]+/g)?.length || 1;
    const words = text.split(/\s+/).length;
    const syllables =
      text
        .toLowerCase()
        .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
        .replace(/^y/, "")
        .match(/[aeiouy]{1,2}/g)?.length || 0;

    const gradelevel = fleschKincaid({
      sentence: sentences,
      word: words,
      syllable: syllables,
    });
    const gradeLevel = gradelevel.toFixed(2);

    return c.json({
      speed: speedResult,
      readability: { gradeLevel },
      keywords: sortedKeywords,
    });
  } catch (error) {
    return c.json({ message: error.message }, 400);
  }
});

app.post("/", async (c) => {
  const { text, wpm: wpmBody } = await c.req.json();

  if (!text) {
    return c.json({ message: "Please provide text" }, 400);
  }

  try {
    const wpm = wpmBody ? validateWPM(Number(wpmBody)) : defaultWPM;

    // Speed calculation
    const speedResult = calcSpeed(text, wpm);

    // Keyword analysis
    const sortedKeywords = countAndSortKeywords(text);

    // Readability calculation
    const sentences = text.match(/[^.!?]+[.!?]+/g)?.length || 1;
    const words = text.split(/\s+/).length;
    const syllables =
      text
        .toLowerCase()
        .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
        .replace(/^y/, "")
        .match(/[aeiouy]{1,2}/g)?.length || 0;

    const gradeLevel = fleschKincaid({
      sentence: sentences,
      word: words,
      syllable: syllables,
    });

    return c.json({
      speed: speedResult,
      readability: { gradeLevel },
      keywords: sortedKeywords,
    });
  } catch (error) {
    return c.json({ message: error.message }, 400);
  }
});

export default app;
