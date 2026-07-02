import random

destinations = {
    'Tokio, Japón': ['Sakura', 'Neon', 'Imperial', 'Zen', 'Shibuya', 'Shinjuku', 'Fuji View', 'Edo', 'Meiji', 'Ginza'],
    'París, Francia': ['Eiffel', 'Louvre', 'Seine', 'Montmartre', 'Bastille', 'Notre Dame', 'Champs', 'Amelie', 'Rivoli', 'Versailles'],
    'Roma, Italia': ['Colosseum', 'Vatican', 'Trevi', 'Pantheon', 'Navona', 'Palatino', 'Forum', 'Borghese', 'Spanish Steps', 'Tiber'],
    'Cancún, México': ['Maya', 'Playa', 'Tulum', 'Caribe', 'Oasis', 'Azul', 'Riviera', 'Palms', 'Sunset', 'Coral'],
    'Londres, Reino Unido': ['Thames', 'Big Ben', 'Tower', 'Hyde', 'Regent', 'Covent', 'Piccadilly', 'Soho', 'Victoria', 'Oxford'],
    'Nueva York, USA': ['Manhattan', 'Central', 'Times', 'Brooklyn', 'Empire', 'Liberty', 'Broadway', 'SoHo', 'Chelsea', 'Fifth Ave']
}

with open('seed.sql', 'w', encoding='utf-8') as f:
    f.write('SET NAMES utf8mb4;\n')
    f.write('UPDATE hoteles SET direccion = \'Tokio, Japón\' WHERE direccion = \'Tokio, JapÃ³n\';\n')
    for dest, prefixes in destinations.items():
        for i in range(10):
            nombre = f'Hotel {prefixes[i]} {random.choice(["Grand", "Resort", "Suites", "Boutique", "Spa", "Plaza"])}'
            estrellas = random.randint(3, 5)
            f.write(f'INSERT INTO hoteles (nombre, direccion, estrellas) VALUES (\'{nombre}\', \'{dest}\', {estrellas});\n')
