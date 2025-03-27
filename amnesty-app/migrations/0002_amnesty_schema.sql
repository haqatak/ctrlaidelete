-- Migration number: 0002 	 2025-03-27T12:15:00.000Z
-- Amnesty International Interactive Experience Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS personality_types;
DROP TABLE IF EXISTS dimensions;
DROP TABLE IF EXISTS question_dimension_mapping;
DROP TABLE IF EXISTS amnesty_causes;
DROP TABLE IF EXISTS personality_cause_mapping;
DROP TABLE IF EXISTS user_results;

-- Categories table for question grouping
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  image_url TEXT,
  video_url TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Personality types
CREATE TABLE IF NOT EXISTS personality_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  main_values TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Dimensions for personality matrix
CREATE TABLE IF NOT EXISTS dimensions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  high_description TEXT NOT NULL,
  low_description TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Mapping between questions and dimensions (with weight)
CREATE TABLE IF NOT EXISTS question_dimension_mapping (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL,
  dimension_id INTEGER NOT NULL,
  weight INTEGER NOT NULL, -- Positive for high score, negative for low score
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (dimension_id) REFERENCES dimensions(id)
);

-- Amnesty causes/projects
CREATE TABLE IF NOT EXISTS amnesty_causes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL,
  goals TEXT NOT NULL,
  actions TEXT NOT NULL,
  impact TEXT,
  image_url TEXT,
  link_url TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Mapping between personality types and recommended causes
CREATE TABLE IF NOT EXISTS personality_cause_mapping (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personality_type_id INTEGER NOT NULL,
  cause_id INTEGER NOT NULL,
  relevance_score INTEGER NOT NULL, -- Higher means more relevant
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (personality_type_id) REFERENCES personality_types(id),
  FOREIGN KEY (cause_id) REFERENCES amnesty_causes(id)
);

-- User results (anonymous)
CREATE TABLE IF NOT EXISTS user_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  personality_type_id INTEGER NOT NULL,
  dimension_scores TEXT NOT NULL, -- JSON string with dimension scores
  recommended_causes TEXT NOT NULL, -- JSON string with cause IDs
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (personality_type_id) REFERENCES personality_types(id)
);

-- Create indexes for performance
CREATE INDEX idx_questions_category ON questions(category_id);
CREATE INDEX idx_question_dimension_question ON question_dimension_mapping(question_id);
CREATE INDEX idx_question_dimension_dimension ON question_dimension_mapping(dimension_id);
CREATE INDEX idx_personality_cause_personality ON personality_cause_mapping(personality_type_id);
CREATE INDEX idx_personality_cause_cause ON personality_cause_mapping(cause_id);
CREATE INDEX idx_user_results_personality ON user_results(personality_type_id);
CREATE INDEX idx_user_results_session ON user_results(session_id);
