import { useRouter } from 'next/router';
import { useState } from 'react';
import API from '../../apis/api.js';
import Layout from '../../components/layout.js';
import UserInfo from '../../components/userInfo.js';
import { PresetContextProvider } from '../../context/PresetContext.js';
import { NewPreset, PresetList } from '../../components/lists/presetList.js';
import {CollectionContextProvider } from '../../context/CollectionContext.js';
import { NewCollection, CollectionList} from '../../components/lists/collectionList.js';
import utilStyles from '../../styles/utils.module.css';
import buttonStyles from '../../components/buttons.module.css';

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

    const validateGenerateTestForm = () => {
        if (testSelection.presetSelection === "") {
            window.alert("Please select a preset!");
            return false;
        };

        for (let key in testSelection) {
            if (key !== "presetSelection" && testSelection[key] !== "0") {
                return true;
            }
        }
        window.alert("Please choose at least one subcollection!");
        return false;
    }

    const GenerateTest = async (e) => {
        e.preventDefault();
        const valid = validateGenerateTestForm();
        if (valid === false) {
            return false;
        };
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
            <p>Select a preset and several subcollections to generate a test :)</p>
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
                    <CollectionList username={username} handleChange={handleChange}/>
                </CollectionContextProvider>
            </div>
            <input form="generate-form" type="submit" value="Generate Practice Test" className={buttonStyles.listOther}/>
        </section>
    </Layout>);
}

export async function getServerSideProps(context) {
    return {props: {}}
}

export default UserPage
