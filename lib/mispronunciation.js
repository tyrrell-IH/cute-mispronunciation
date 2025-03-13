import { hiraganaToRoman } from "./hiraganaToRomanData.js";

export class Mispronunciation {
  #word;

  constructor(word) {
    this.#word = word;
  }

  #splitIntoHiraganaCharacters(word) {
    return word.match(/.ぁ|.ぃ|.ぅ|.ぇ|.ぉ|.ゃ|.ゅ|.ょ|./g);
  }

  #splitIntoPhonemes(hiraganaCharacters) {
    const romanCharacters = hiraganaCharacters
      .map((character, i) => {
        return { index: i, roman: hiraganaToRoman[character] };
      })
      .filter((character) => character.roman);

    return romanCharacters.map((character) => {
      return {
        index: character.index,
        consonant: character.roman.slice(0, -1),
        vowel: character.roman.slice(-1),
      };
    });
  }

  #pairUp(phonemes) {
    const pairs = [];
    for (let i = 0; i < phonemes.length; i++) {
      for (let j = i + 1; j < phonemes.length; j++) {
        pairs.push([phonemes[i], phonemes[j]]);
      }
    }
    return pairs;
  }

  #removeInvalidPairs(phonemesPairs) {
    return phonemesPairs.filter((pair) => {
      if (this.#isEachConsonantBlank(pair)) {
        return false;
      } else if (this.#isEachVowelN(pair)) {
        return false;
      } else if (this.#hasConsonantYAndVowelIE(pair)) {
        return false;
      } else if (this.#hasConsonantWAndVowelIUE(pair)) {
        return false;
      } else {
        return true;
      }
    });
  }

  #isEachConsonantBlank(pair) {
    return pair[0].consonant === "" && pair[1].consonant === "";
  }

  #isEachVowelN(pair) {
    return pair[0].vowel === "n" && pair[1].vowel === "n";
  }

  #hasConsonantYAndVowelIE(pair) {
    const hasYConsonant = pair.some((character) =>
      character.consonant.includes("y"),
    );
    if (hasYConsonant) {
      return (
        ["i", "e"].includes(pair[0].vowel) || ["i", "e"].includes(pair[1].vowel)
      );
    } else {
      return false;
    }
  }

  #hasConsonantWAndVowelIUE(pair) {
    const hasWConsonant = pair.some((character) =>
      character.consonant.includes("w"),
    );
    if (hasWConsonant) {
      return (
        ["i", "u", "e"].includes(pair[0].vowel) ||
        ["i", "u", "e"].includes(pair[1].vowel)
      );
    } else {
      return false;
    }
  }

  create() {
    const hiraganaCharacters = this.#splitIntoHiraganaCharacters(this.#word);
    const phonemes = this.#splitIntoPhonemes(hiraganaCharacters);
    const phonemesPairs = this.#pairUp(phonemes);
    return this.#removeInvalidPairs(phonemesPairs);
  }
}
