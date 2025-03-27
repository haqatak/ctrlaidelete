// Database service for Amnesty International Interactive Experience
import { D1Database } from '@cloudflare/workers-types';
import { 
  Question, 
  Category, 
  PersonalityType, 
  Dimension, 
  AmnestyCause,
  UserResult
} from './types';

export class DatabaseService {
  constructor(private db: D1Database) {}

  // Questions
  async getQuestions(limit?: number): Promise<Question[]> {
    const query = limit 
      ? 'SELECT * FROM questions ORDER BY RANDOM() LIMIT ?'
      : 'SELECT * FROM questions';
    
    const params = limit ? [limit] : [];
    const result = await this.db.prepare(query).bind(...params).all();
    return result.results as Question[];
  }

  async getQuestionsByCategory(categoryId: number): Promise<Question[]> {
    const result = await this.db
      .prepare('SELECT * FROM questions WHERE category_id = ?')
      .bind(categoryId)
      .all();
    return result.results as Question[];
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    const result = await this.db.prepare('SELECT * FROM categories').all();
    return result.results as Category[];
  }

  // Personality Types
  async getPersonalityTypes(): Promise<PersonalityType[]> {
    const result = await this.db.prepare('SELECT * FROM personality_types').all();
    return result.results as PersonalityType[];
  }

  async getPersonalityType(id: number): Promise<PersonalityType | null> {
    const result = await this.db
      .prepare('SELECT * FROM personality_types WHERE id = ?')
      .bind(id)
      .first();
    return result as PersonalityType | null;
  }

  // Dimensions
  async getDimensions(): Promise<Dimension[]> {
    const result = await this.db.prepare('SELECT * FROM dimensions').all();
    return result.results as Dimension[];
  }

  // Question-Dimension Mappings
  async getQuestionDimensionMappings(questionId: number): Promise<any[]> {
    const result = await this.db
      .prepare('SELECT * FROM question_dimension_mapping WHERE question_id = ?')
      .bind(questionId)
      .all();
    return result.results;
  }

  // Amnesty Causes
  async getAmnestyCauses(): Promise<AmnestyCause[]> {
    const result = await this.db.prepare('SELECT * FROM amnesty_causes').all();
    return result.results as AmnestyCause[];
  }

  async getAmnestyCause(id: number): Promise<AmnestyCause | null> {
    const result = await this.db
      .prepare('SELECT * FROM amnesty_causes WHERE id = ?')
      .bind(id)
      .first();
    return result as AmnestyCause | null;
  }

  // Personality-Cause Mappings
  async getCausesForPersonalityType(personalityTypeId: number, limit: number = 3): Promise<AmnestyCause[]> {
    const result = await this.db
      .prepare(`
        SELECT c.* FROM amnesty_causes c
        JOIN personality_cause_mapping pcm ON c.id = pcm.cause_id
        WHERE pcm.personality_type_id = ?
        ORDER BY pcm.relevance_score DESC
        LIMIT ?
      `)
      .bind(personalityTypeId, limit)
      .all();
    return result.results as AmnestyCause[];
  }

  // User Results
  async saveUserResult(result: UserResult): Promise<number> {
    const { sessionId, personalityTypeId, dimensionScores, recommendedCauses } = result;
    
    const insertResult = await this.db
      .prepare(`
        INSERT INTO user_results (session_id, personality_type_id, dimension_scores, recommended_causes)
        VALUES (?, ?, ?, ?)
      `)
      .bind(
        sessionId, 
        personalityTypeId, 
        JSON.stringify(dimensionScores), 
        JSON.stringify(recommendedCauses)
      )
      .run();
    
    return insertResult.meta.last_row_id as number;
  }
}
