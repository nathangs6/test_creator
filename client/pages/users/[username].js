import Layout from '../../components/layout.js';
import UserInfo from '../../components/userInfo.js';
import Modal from '../../components/modals/modal.js';
import API from '../../apis/api.js';
import { PresetContextProvider } from '../../context/PresetContext.js';
import { NewPreset, PresetList } from '../../components/lists/presetList.js';
import {CollectionContextProvider } from '../../context/CollectionContext.js';
import { NewCollection, CollectionList} from '../../components/lists/collectionList.js';
import utilStyles from '../../styles/utils.module.css';
import convertObjectToArray from '../../lib/convertObjectToArray.js';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ModalConfirmButton } from '../../components/buttons.js';

//function UserPage({ collectionData, presetData }) {
function UserPage() {
    const router = useRouter();
    const { username } = router.query;

    const [testSelection, setTestSelection] = useState({
        presetSelection: ""
    });

    const handleChange = (e) => {
        setTestSelection({
            ...testSelection,
            [e.target.name]: e.target.value
        });
    };

    const GenerateTest = async (e) => {
        e.preventDefault();
        await API.post("/generate/" + username, {testSelection});
        const response = await API.get("/generate/download/" + username, {responseType: 'blob'});
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute("download", "file.pdf");
        document.body.appendChild(link);
        link.click();
    };

    return (<Layout>
        <div className={utilStyles.centre}>
            <h1>Hello {username}</h1>
        </div>
        <UserInfo username={username}/>
        <hr/>
        <section>
            <form onSubmit={e => GenerateTest(e)} id="generate-form"></form>
            <h2>Generate Practice Test</h2>
            <h3>Select Preset</h3>
            <PresetContextProvider>
                <NewPreset username={username}/>
                <div>
                    <PresetList username={username} handleChange={handleChange}/>
                </div>
            </PresetContextProvider>
            <h3>Select Questions</h3>
            <div>
                <CollectionContextProvider>
                    <NewCollection username={username}/>
                    <CollectionList username={username} handleChange={handleChange}/>
                </CollectionContextProvider>
            </div>
            <input form="generate-form" type="submit" value="Generate Practice Test"/>
        </section>
    </Layout>);
}

export async function getServerSideProps(context) {
    return {props: {}}
}

export default UserPage
