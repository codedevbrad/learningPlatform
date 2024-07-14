import { blockObjects } from "../../blocks/exports"
import { useState } from "react"
import Select from 'react-select'

export default function BlockSelector({ updatedBlocks }) {
  const [blocksSelected, setBlocksSelected] = useState([]);

  const handleSelectChange = (selectedOptions) => {
    setBlocksSelected(selectedOptions);
    updatedBlocks(selectedOptions);
  };

  const options = blockObjects.map(block => ({
    value: block.type,
    label: block.type,
    schema: block
  }));

  return (
    <div className="flex flex-wrap my-3 flex-col">
      <Select
        isMulti
        value={blocksSelected}
        onChange={handleSelectChange}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder={'Choose the Blocks to build with ...'}
      />
    </div>
  );
}