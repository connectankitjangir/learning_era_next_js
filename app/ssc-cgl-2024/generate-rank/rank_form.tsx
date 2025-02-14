'use client';

interface RankFormProps {
  rollNo: string;
  setRollNo: (value: string) => void;
  selectedMarkType: string;
  setSelectedMarkType: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function RankForm({
  rollNo,
  setRollNo,
  selectedMarkType,
  setSelectedMarkType,
  handleSubmit,
}: RankFormProps) {
  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <input
        type="text"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        placeholder="Enter Roll No"
        className="p-2 rounded-md"
        required
      />
      <select
        value={selectedMarkType}
        onChange={(e) => setSelectedMarkType(e.target.value)}
        className="ml-2 p-2 rounded-md bg-white text-purple-600"
      >
        <option value="raw_marks">Raw Marks</option>
        <option value="raw_with_bonus">Raw with Bonus</option>
        <option value="normalized_marks">Normalized Marks</option>
      </select>
      <button type="submit" className="ml-2 p-2 bg-white text-purple-600 rounded-md">
        Submit
      </button>
    </form>
  );
}