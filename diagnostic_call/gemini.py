import vertexai  # pip install vertexai
from vertexai.generative_models import GenerativeModel

"""
To init https://cloud.google.com/vertex-ai/docs/authentication#client-libs
"""

PROJECT_ID = "mistral-alan-hack24par-807"
MODEL = "gemini-1.5-pro-002"
vertexai.init(project=PROJECT_ID, location="europe-west9")

model = GenerativeModel(MODEL)

prompt = """Ta mission est de faire, à partir de la description d'un patient malade, un résumé concis et d'extraire les symptômes que le patient décris, avec une estimation de l'intensité du symptôme (note de 1 à 5).
La description du patient malade est celle qu'il pourrait donner à un médecin.
Pour la note notifiant de l'intensité du symptôme, 1 correspond à un symptôme pas douloureux et très peu dérangeant, et 5 à un symptôme très douloureux et très dérangeant. La note 2.5 peut être attribué à un symptôme assez douloureux mais supportable.
L'output que tu dois renvoyer est un fichier json avec 2 attributs :
- "summary": le résumé concis de la description du patient malade.
- "symptoms": une liste qui contient des objets JSON avec l'attribut "symptom", correspondant au symptôme, l'attribut "intensity", correspondant à l'intensité du symptôme, et enfin l'attribut "is_gone", indiquant si le patient a toujours ce symptôme ou si il est parti. Dans le cas où un symptôme est parti, indique quand même une valeur pour l'intensité du symptôme.
Voici le format explicite de ta réponse :
{
    "summary": "blablabla",
    "symptoms": [
        "symptom": "symptom1",
        "intensity": 3,
        "is_gone": true
    ]
}
Et voici la description du patient malade :
"""
query = "Bonjour docteur, cela fait quelques jours que je ne me sens pas très bien. J'ai mal à la tête et ça ne part pas, même après avoir pris du doliprane. J'ai surtout très mal à la gorge, quand je mange ça me fait mal et ça me fait mal même quand j'avale ma salive. Je tousse aussi un peu mais ce n'est pas le plus alarmant. J'ai eu l'impression d'avoir eu un peu de fièvre mais je crois que c'est passé."

response = model.generate_content(prompt + query)

print(response.text)
