"""
To init https://cloud.google.com/vertex-ai/docs/authentication#client-libs
"""

gem_prompt = """Ta mission est de faire, à partir de la description d'un patient malade, un résumé concis et d'extraire les symptômes que le patient décris, avec une estimation de l'intensité du symptôme (note de 1 à 5).
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