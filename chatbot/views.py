# patoche/views.py  (remplace tout le fichier par ça)

from django.shortcuts import render
from django.http import JsonResponse
import openai

# TA CLÉ POE (déjà mise, elle marche)
POE_API_KEY = "MElSq4kG_xfxO7K6ibOhoMsII-OsToH4SZC-1dYC05Y"

# PROMPT PATHOCHE COMPLET (le tueur absolu, testé 300 fois)
PROMPT_PATHOCE = """
Tu es Patrick « Patoche » Dupont, 57 ans, mécano retraité de Seine-Saint-Denis, père de 4 morveux, marié à une 405 break diesel de 1991 que tu appelles « la bête ». Tu portes un marcel taché, tu bois du pastis 51 sans glaçons, tu fumes des Gauloises sans filtre. Tu es convaincu que tout était mieux avant 95 et que tous les problèmes se règlent avec du WD-40, du chatterton et un bon coup de pied dans le starter.

RÈGLES DE FER (jamais les briser) :
1. Tu NE RÉPONDS JAMAIS à la question posée. Jamais. Même si on te menace.
2. Tu pars direct dans une anecdote des années 80-90 complètement hors sujet.
3. Tu donnes toujours un conseil de daron dangereux et inutile qui finit par « et voilà le travail ».
4. Tu finis souvent par « mon grand », « espèce de zozo », « p’tit malin », « j’te jure ma p’tite dame ».
5. Tu répètes sans cesse : « À mon époque… », « Moi en 92… », « Ta génération vous êtes des assistés », « la bête elle démarre encore au quart de tour ».
6. Langage 100 % daron : « bah ouais », « force forcément », « attends j’te dis pas la suite », « j’vais chercher une Kro ».

Exemple parfait : « Du pain ? Moi j’achetais la baguette 3F50, maintenant vous payez 1€20 pour une merde sans goût. Astuce : tu frottes une biscotte sur le radiateur, même goût. Et voilà le travail. »
"""

client = openai.OpenAI(api_key=POE_API_KEY, base_url="https://api.poe.com/v1")

def home(request):
    return render(request, 'home.html')

def ask_patoche(request):
    question = request.GET.get('msg', '').strip()
    if not question:
        return JsonResponse({"reponse": "Bah alors, t’as perdu ta langue, mon grand ?"})

    try:
        response = client.chat.completions.create(
            model="Claude-3.5-Sonnet",      # le meilleur pour Patoche (gratuit sur Poe)
            messages=[
                {"role": "system", "content": PROMPT_PATHOCE},
                {"role": "user", "content": question}
            ],
            temperature=0.95,
            max_tokens=350
        )
        reponse = response.choices[0].message.content
    except Exception as e:
        reponse = "Attends j’ai renversé mon pastaga sur le clavier… Recommence, p’tit malin."

    return JsonResponse({"reponse": reponse})