import {SearchOutlined} from "@ant-design/icons";
import {Button, Input, Select, Space} from "antd";
import {SearchBarProps} from "~/types";

const SearchBar = ({
  typeSearch,
  options,
  params,
  setParams,
}: SearchBarProps): JSX.Element => {
  return (
    <Space.Compact size="large">
      <Input
        style={{
          minWidth: 400,
        }}
        allowClear
        placeholder="Type here to search ... "
        onChange={(e) =>
          setParams((pre) => ({
            ...pre,
            searchValue: e.target.value,
          }))
        }
      />
      <Select
        options={options}
        style={{minWidth: 152}}
        placeholder="Search field"
        allowClear={true}
        onChange={(value) => {
          setParams((pre) => ({
            ...pre,
            field: value as string | undefined,
          }));
        }}
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        loading={false}
        // onClick={() => getTableData(params, typeSearch)}
      />
    </Space.Compact>
  );
};

export default SearchBar;
