interface CategoryItemProps {
  item: any;
}

const CategoryItems = ({ item }: CategoryItemProps) => {
  return (
    <tr className="text-white bg-[#777] hover:cursor-pointer">
      <td className="px-2 py-1 border border-gray-600">{item.id}</td>
      <td className="px-2 py-1 border border-gray-600">{item.name}</td>
      <td className="px-2 py-1 border border-gray-600">{item.changed}</td>
      <td className="px-2 py-1 border border-gray-600 bg-white text-black">
        {item.order}
      </td>
      <td className="w-48 border border-gray-600">
        <div className="flex gap-0.5">
          <button className="button py-2 bg-[#333] hover:bg-[#444] w-full">
            Translate
          </button>
          <button className="button py-2 bg-[#333] hover:bg-[#444] w-full">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryItems;