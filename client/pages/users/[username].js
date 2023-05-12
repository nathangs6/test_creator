import Layout from '../../components/layout.js';
import UserInfo from '../../components/userInfo.js';
import Modal from '../../components/modals/modal.js';
import { PresetContextProvider } from '../../context/PresetContext.js';
import { newPreset, PresetList } from '../../components/lists/presetList.js';
import {CollectionContextProvider } from '../../context/CollectionContext.js';
import { newCollection, CollectionList} from '../../components/lists/collectionList.js';
import utilStyles from '../../styles/utils.module.css';
import convertObjectToArray from '../../lib/convertObjectToArray.js';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ModalConfirmButton } from '../../components/buttons.js';

//function UserPage({ collectionData, presetData }) {
function UserPage() {
    const router = useRouter();
    const { username } = router.query;
    return (<Layout>
        <div className={utilStyles.centre}>
            <h1>Hello {username}</h1>
        </div>
        <UserInfo username={username}/>
        <hr/>
        <section>
            <form id="generate-form" action="http://localhost:3001/api/generate/" method="POST"></form>
            <h2>Generate Practice Test</h2>
            <h3>Select Preset</h3>
            {newPreset(username)}
            <div>
                <PresetContextProvider>
                    <PresetList username={username}/>
                </PresetContextProvider>
            </div>
            <h3>Select Questions</h3>
            <div>
                {newCollection(username)}
                <CollectionContextProvider>
                    <CollectionList username={username}/>
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
