import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export const getCandidateRank = async (roll_number: string, markType: string): Promise<number | null> => {
//   const { data, error } = await supabase
//     .from('cgl_2024_result')
//     .select('*')
//     .eq('roll_number', roll_number);

//   if (error) {
//     console.error('Error fetching candidate:', error);
//     return null;
//   }

//   if (data && data.length > 0) {
//     const candidate = data[0];
//     let rank: number | null = null;

//     // Calculate rank based on marks
//     const marks = markType === 'raw_marks' ? candidate.raw_marks :
//                   markType === 'raw_with_bonus' ? candidate.raw_with_bonus :
//                   markType === 'normalized_marks' ? candidate.normalized_marks : null;

//     if (marks !== null) {
//       // Assuming you have a function to calculate rank based on marks
//       rank = await calculateRankBasedOnMarks(marks);
//     }

//     return rank;
//   }

//   return null;
// };

// // Function to calculate rank based on marks
// const calculateRankBasedOnMarks = async (marks: number): Promise<number | null> => {
//   // Implement your logic to calculate rank based on marks
//   // This is a placeholder implementation
//   const { data, error } = await supabase
//     .from('cgl_2024_result')
//     .select('roll_number')
//     .gt('marks', marks) // Assuming 'marks' is the field name
//     .order('marks', { ascending: false });

//   if (error) {
//     console.error('Error calculating rank:', error);
//     return null;
//   }

//   return data ? data.length + 1 : null; // Rank is the count of candidates with higher marks + 1
// };
