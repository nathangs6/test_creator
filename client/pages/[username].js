import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import useAPIPrivate from '../hooks/useAPIPrivate.js';
import AuthorizationContext from '../context/AuthorizationContext';
import Layout from '../components/layout.js';
import UserInfo from '../components/userInfo.js';
import { PresetContextProvider } from '../context/PresetContext.js';
import { NewPreset, PresetList } from '../components/lists/presetList.js';
import {CollectionContextProvider } from '../context/CollectionContext.js';
import { NewCollection, CollectionList} from '../components/lists/collectionList.js';
import utilStyles from '../styles/utils.module.css';
import buttonStyles from '../components/buttons.module.css';

//function UserPage({ collectionData, presetData }) {
function UserPage() {
    const { auth } = useContext(AuthorizationContext);
    const API = useAPIPrivate();
    const router = useRouter();
    const { username } = router.query;

    const [userAuthorized, setUserAuthorized] = useState(false);

    useEffect(() => {
        if (auth.username !== username) {
            router.push({ pathname: "/" });
        } else {
            setUserAuthorized(true);
        }
    }, []);

    const [testSelection, setTestSelection] = useState({
        presetSelection: ""
    });

    const handleChange = (e) => {
        setTestSelection({
            ...testSelection,
            [e.target.name]: e.target.value
        });
    };

    const [generateAlert, setGenerateAlert] = useState(false);
    const [generateAlertMsg, setGenerateAlertMsg] = useState('');

    const validateGenerateTestForm = () => {
        if (testSelection.presetSelection === "") {
            setGenerateAlertMsg("Please select a preset!");
            setGenerateAlert(true);
            return false;
        };

        for (let key in testSelection) {
            if (key !== "presetSelection" && testSelection[key] !== "0") {
                return true;
            }
        }
        setGenerateAlertMsg("Please choose at least one subcollection!");
        setGenerateAlert(true);
        return false;
    }

    const GenerateTest = async (e) => {
        e.preventDefault();
        const valid = validateGenerateTestForm();
        if (valid === false) {
            return false;
        };
        console.log("Generating...");
        try {
            await API.post("/generate/" + username, {testSelection});
        } catch(err) {
            setGenerateAlertMsg("You chose more questions than a subcollection has!");
            setGenerateAlert(true);
            return null;
        };
        setGenerateAlert(false);
        setGenerateAlertMsg('');
        console.log("Downloading...");
        const response = await API.get("/generate/" + username, {responseType: 'blob'});
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute("download", "file.pdf");
        document.body.appendChild(link);
        link.click();
    };

    return (<>{userAuthorized && <Layout>
        <div className={utilStyles.centre}>
            <h1>Hello {username}</h1>
        </div>
        <UserInfo username={username}/>
        <hr/>
        <section>
            <form onSubmit={e => GenerateTest(e)} id="generate-form"></form>
            <h2 className={utilStyles.sectionHeader}>Generate Practice Test</h2>
            <p className={utilStyles.noMargin}>Select a preset and several subcollections to generate a test :)</p>
            <h3 className={utilStyles.sectionHeader}>Select Preset</h3>
            <PresetContextProvider>
                <div className={utilStyles.noMargin}>
                    <PresetList username={username} handleChange={handleChange}/>
                </div>
            </PresetContextProvider>
            <h3 className={utilStyles.sectionHeader}>Select Questions</h3>
            <div className={utilStyles.noMargin}>
                <CollectionContextProvider>
                    <CollectionList username={username} handleChange={handleChange}/>
                </CollectionContextProvider>
            </div>
            <div className={[utilStyles.centre, buttonStyles.generateButtonContainer].join(" ")}>
                <input form="generate-form" type="submit" value="Generate Practice Test" className={[buttonStyles.listOther, buttonStyles.generateButton].join(" ")}/>
            {generateAlert && <p>{generateAlertMsg}</p>}
            </div>
        </section>
    </Layout>}</>);
}

export async function getServerSideProps(context) {
    return {props: {}}
}

export default UserPage
