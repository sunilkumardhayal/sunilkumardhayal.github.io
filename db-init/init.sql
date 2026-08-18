-- SCHEMA DEFINITION FOR SCHOLAR OS

-- 1. Transit Network Table
CREATE TABLE transit_schedules (
    id SERIAL PRIMARY KEY,
    route_name VARCHAR(100) NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL, -- '56-Seater', '29-Seater', 'EECO'
    departure_time TIME NOT NULL,
    direction VARCHAR(50) NOT NULL,    -- 'outbound', 'inbound', 'internal'
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. Nutrition Matrix Table
CREATE TABLE dining_menus (
    id SERIAL PRIMARY KEY,
    day_of_week INT NOT NULL,          -- 0 (Sun) to 6 (Sat)
    meal_type VARCHAR(20) NOT NULL,    -- 'Breakfast', 'Lunch', 'Snacks', 'Dinner'
    items TEXT NOT NULL
);

-- SEED DATA: TRANSIT (Sample from your PDFs)
INSERT INTO transit_schedules (route_name, vehicle_type, departure_time, direction) VALUES
('Mess to Kudasan', '56-Seater', '07:00:00', 'outbound'),
('Kudasan to Mess', '56-Seater', '07:30:00', 'inbound'),
('JEET to Mess', 'EECO', '07:50:00', 'internal'),
('JEET to Mess', '29-Seater', '08:20:00', 'internal'),
('Mess to Kudasan', '56-Seater', '08:30:00', 'outbound'),
('Mess to Kudasan', '56-Seater', '21:30:00', 'outbound');

-- SEED DATA: DINING (Sample from your PDFs)
INSERT INTO dining_menus (day_of_week, meal_type, items) VALUES
(0, 'Breakfast', 'Poha/Sprouts, Bread Jam, Tea/Coffee'),
(0, 'Lunch', 'Baingan Bharta, Dal Panchratni, Rice, Chapati'),
(1, 'Breakfast', 'Veg Cutlet, Sprouts, Bread Butter Jam, Tea/Coffee'),
(1, 'Lunch', 'Tadka Dal, Maths Veg, Rice, Chapati');
