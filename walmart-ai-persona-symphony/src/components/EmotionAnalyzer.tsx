
export class EmotionAnalyzer {
  private static emotionKeywords = {
    frustrated: ['frustrated', 'annoyed', 'angry', 'upset', 'irritated', 'mad'],
    confused: ['confused', 'lost', 'unclear', 'don\'t understand', 'help me understand'],
    excited: ['excited', 'love', 'amazing', 'awesome', 'great', 'fantastic', 'wonderful'],
    satisfied: ['satisfied', 'happy', 'pleased', 'good', 'perfect', 'exactly'],
    dissatisfied: ['disappointed', 'bad', 'terrible', 'awful', 'hate', 'worst'],
    neutral: []
  };

  static analyzeText(text: string): string {
    const lowerText = text.toLowerCase();
    
    for (const [emotion, keywords] of Object.entries(this.emotionKeywords)) {
      if (emotion === 'neutral') continue;
      
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          return emotion;
        }
      }
    }
    
    return 'neutral';
  }

  static getEmotionColor(emotion: string): string {
    const colors = {
      frustrated: 'text-red-600',
      confused: 'text-yellow-600',
      excited: 'text-green-600',
      satisfied: 'text-blue-600',
      dissatisfied: 'text-red-500',
      neutral: 'text-gray-600'
    };
    
    return colors[emotion as keyof typeof colors] || colors.neutral;
  }
}
