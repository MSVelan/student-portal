type Group = { id: number; name: string; branch: string; year: number };

export default function GroupCard({
  group,
  onJoin,
}: {
  group: Group;
  onJoin: (id: number) => void;
}) {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center bg-white shadow-sm">
      <div>
        <p className="font-medium">{group.name}</p>
        <p className="text-sm text-gray-500">
          {group.branch} — Year {group.year}
        </p>
      </div>
      <button
        onClick={() => onJoin(group.id)}
        className="bg-blue-600 text-white text-sm rounded px-3 py-1"
      >
        Join
      </button>
    </div>
  );
}
