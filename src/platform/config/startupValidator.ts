export function validateStartupConfig() {
  const requiredEnvVars = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXT_PUBLIC_APP_URL'
  ];

  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingVars.length > 0) {
    console.error('===========================================================');
    console.error('🔥 FATAL ERROR: Missing Required Environment Variables 🔥');
    console.error('===========================================================');
    console.error('The following environment variables must be set:');
    missingVars.forEach(v => console.error(` - ${v}`));
    console.error('===========================================================');
    
    // In production, we actually exit to prevent booting in a broken state
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.warn('⚠️  Running in development mode without required vars. Some features will crash.');
    }
  }
}
