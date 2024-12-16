import { Button, Input, List, Space } from "antd";
import { observer } from "mobx-react-lite";
import { SearchOutlined } from '@ant-design/icons';
import { useStore } from "../../app/store/store";
import { useState } from "react";
import ProfileContainer from "../profile/ProfileContainer";


function SearchElement(){
    const { profileStore} = useStore()
    const [searchTerm, setSearchTerm] = useState<string>('');
    
    return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search users by name or tag"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          onClick={ () => {profileStore.searchProfilesByTag(searchTerm)}}
        >
          Find
        </Button>
      </Space>

      <div className="profiles">
        {profileStore.SearchResultProfiles.map((profile, index) => (
            <ProfileContainer  
                key={index}  
                profile={profile}         
                />
        ))}
      </div>
    </div>
  );
}

export default observer(SearchElement)