from flask import Flask, request, jsonify
from flask_cors import CORS
import pyphen
import random
from constants import DEFAULT_PREFIX_SIZE_CHARS_FOR_HASH, DEFAULT_SEED
app = Flask(__name__)
CORS(app) 
from collections import OrderedDict
import re 
def syllable_tokenizer(text, lang='en_US'):
    dic = pyphen.Pyphen(lang=lang)
    # Split text into lines
    lines = text.split('\n')
    syllables = []
    for line in lines:
        # Split line into words and punctuation, including surrounding whitespace
        words_and_punct = re.findall(r"\s*\w+(?:'\w+)?\s*|[^\w\s]\s*|\s+", line, re.UNICODE)
        for i, token in enumerate(words_and_punct):
            if re.match(r"\s*\w+(?:'\w+)?\s*", token):  # If it's a word with possible surrounding whitespace and apostrophes
                word = token.strip()  # Remove surrounding whitespace for syllable splitting
                syllables_in_word = dic.inserted(word).split('-')
                for syllable in syllables_in_word:
                    syllables.append(syllable)
                # Check if the next token is punctuation that should not have a space before it
                if i + 1 < len(words_and_punct) and re.match(r"[?.!,]", words_and_punct[i + 1].strip()):
                    continue  # Do not add a space
                else:
                    syllables.append(' ')  # Add a space to denote the word boundary
            else:  # If it's punctuation or whitespace
                syllables.append(token)
        syllables.append('\n')  # Add a newline character to denote the line boundary
    return syllables

def color_syllables(text, choices, lang='en_US'):
    # Tokenize the text into syllables
    syllables = syllable_tokenizer(text, lang)
    # Create an ordered dictionary from syllables to colors
    random.seed(DEFAULT_SEED if len(text) < DEFAULT_PREFIX_SIZE_CHARS_FOR_HASH else hash(text[:DEFAULT_PREFIX_SIZE_CHARS_FOR_HASH]))
    color_dict = OrderedDict()
    for syllable in syllables:
        if syllable.isspace() or re.match(r"[^\w\s]", syllable):
            color_dict[syllable] = -1
        else:
            color_dict[syllable] = random.choice(choices)
    return color_dict

def map_syllables_to_colors(text, lang='en_US', N=4):
    """
    Map syllables to colors
    :param text: input text
    :param lang: language of the text
    :param N: number of colors
    :return: list of tuples, each tuple contains a syllable and its corresponding "color" represented as an integer
    """
    # Get the syllables from the text
    syllables = syllable_tokenizer(text, lang)
    # Generate the color dictionary
    color_dict = color_syllables(text, range(N), lang)
    # Map syllables to colors
    result = []
    for syllable in syllables:
        result.append((syllable, color_dict[syllable]))
    return result

@app.route('/map_syllables_to_colors', methods=['POST'])
def map_syllables_to_colors_endpoint():
    data = request.json
    text = data.get('text', '')
    lang = data.get('lang', 'en_US')
    N = data.get('N', 4)
    
    if not text:
        return jsonify({'error': 'Text is required'}), 400
    
    result = map_syllables_to_colors(text, lang, N)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)