import { Button, Input, List, Space } from "antd";
import { observer } from "mobx-react-lite";
import { SearchOutlined } from '@ant-design/icons';
import { useStore } from "../../app/store/store";
import { useState } from "react";
import './SearchElement.css'
// import ProfileContainer from "../profile/ProfileContainer";


function SearchElement(){
    const { profileStore, commonStore} = useStore()
    const [searchTerm, setSearchTerm] = useState<string>('');
    const {setSearch} = commonStore
    
    return (
    <div className="searchContainer"
        >
        <Input
          placeholder="Search users by name or tag"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setSearch(true)}
          onBlur={() => {
            setSearchTerm('')
            setSearch(false)
          } }
          prefix={<SearchOutlined />}
          style={{ height: "40px" }} 
        />
        <Button
          type="primary"
          onMouseDown={(e) => e.preventDefault()} 
          onClick={() => {
            profileStore.searchProfilesByTag(searchTerm)

          } }
          style={{ height: "40px", lineHeight: "40px" }} 
        >
          Find
        </Button>
    </div>
  );

     
 
  
}

export default observer(SearchElement)