import random

destinations = {
    'Tokio, Japón': ['Sakura', 'Neon', 'Imperial', 'Zen', 'Shibuya', 'Shinjuku', 'Fuji View', 'Edo', 'Meiji', 'Ginza'],
    'París, Francia': ['Eiffel', 'Louvre', 'Seine', 'Montmartre', 'Bastille', 'Notre Dame', 'Champs', 'Amelie', 'Rivoli', 'Versailles'],
    'Roma, Italia': ['Colosseum', 'Vatican', 'Trevi', 'Pantheon', 'Navona', 'Palatino', 'Forum', 'Borghese', 'Spanish Steps', 'Tiber'],
    'Cancún, México': ['Maya', 'Playa', 'Tulum', 'Caribe', 'Oasis', 'Azul', 'Riviera', 'Palms', 'Sunset', 'Coral'],
    'Londres, Reino Unido': ['Thames', 'Big Ben', 'Tower', 'Hyde', 'Regent', 'Covent', 'Piccadilly', 'Soho', 'Victoria', 'Oxford'],
    'Nueva York, USA': ['Manhattan', 'Central', 'Times', 'Brooklyn', 'Empire', 'Liberty', 'Broadway', 'SoHo', 'Chelsea', 'Fifth Ave']
}

tipos_habitacion = ['Económica', 'Estandar', 'Premium']

with open('seed.sql', 'w', encoding='utf-8') as f:
    f.write('SET NAMES utf8mb4;\n')
    f.write('DELETE FROM habitaciones;\n')
    f.write('DELETE FROM hoteles;\n')
    f.write('ALTER TABLE habitaciones AUTO_INCREMENT = 1;\n')
    f.write('ALTER TABLE hoteles AUTO_INCREMENT = 1;\n\n')

    for dest, prefixes in destinations.items():
        for i in range(10):
            # 1. Insertar Hotel
            nombre = f'Hotel {prefixes[i]} {random.choice(["Grand", "Resort", "Suites", "Boutique", "Spa", "Plaza"])}'
            estrellas = random.randint(3, 5)
            f.write(f"INSERT INTO hoteles (nombre, direccion, estrellas) VALUES ('{nombre}', '{dest}', {estrellas});\n")
            
            # 2. Generar 1 Habitación aleatoria vinculada al hotel recién insertado
            tipo = random.choice(tipos_habitacion)
            if tipo == 'Económica':
                precio = random.randint(30000, 50000)
                capacidad = random.randint(1, 2)
            elif tipo == 'Estandar':
                precio = random.randint(55000, 85000)
                capacidad = random.randint(2, 4)
            else: # Premium
                precio = random.randint(90000, 150000)
                capacidad = random.randint(4, 6)
            
            num_habitacion = f"{random.randint(1, 9)}0{random.randint(1, 9)}" # Ej: 304, 102
            
            f.write(f"INSERT INTO habitaciones (hotel_id, numero, tipo, precio_por_noche, capacidad) VALUES (LAST_INSERT_ID(), '{num_habitacion}', '{tipo}', {precio}, {capacidad});\n\n")
