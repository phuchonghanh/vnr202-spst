import { NextResponse } from 'next/server';
import { QuizService } from '@/lib/quizService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get('count') || '10', 10);

    const questions = await QuizService.getRandomQuestions(count);
    
    return NextResponse.json({
      success: true,
      data: questions
    });
  } catch (error) {
    console.error('Error loading quiz questions:', error);
    return NextResponse.json({
      success: false,
      error: 'Không thể tải câu hỏi quiz'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, questions } = body;

    if (!answers || !questions) {
      return NextResponse.json({
        success: false,
        error: 'Thiếu dữ liệu answers hoặc questions'
      }, { status: 400 });
    }

    const result = QuizService.calculateScore(answers, questions);
    
    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error calculating quiz score:', error);
    return NextResponse.json({
      success: false,
      error: 'Không thể tính điểm quiz'
    }, { status: 500 });
  }
}