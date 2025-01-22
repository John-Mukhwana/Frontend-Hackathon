import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cmyinpvkatiaiasckqgv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNteWlucHZrYXRpYWlhc2NrcWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODczMDIsImV4cCI6MjAzODg2MzMwMn0.X3rhkCuSXsXvlqhUzeG5CS4AM3y6Tju7gnngneT7aCQ'

// Debugging logs

export const supabase = createClient(supabaseUrl, supabaseKey);