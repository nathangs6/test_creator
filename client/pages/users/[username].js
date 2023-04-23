import Layout from '../../components/layout.js';
import UserInfo from '../../components/userInfo.js';
import Modal from '../../components/modals/modal.js';
import { NewPresetModal, EditPresetModal, DeletePresetModal } from '../../components/modals/presetModals.js';
import { NewCollectionModal, RenameCollectionModal, DeleteCollectionModal, NewSubCollectionModal, RenameSubCollectionModal, DeleteSubCollectionModal } from '../../components/modals/collectionModals.js';
import { NewQuestionModal, EditQuestionModal, DeleteQuestionModal } from '../../components/modals/questionModals.js';
import utilStyles from '../../styles/utils.module.css';
import convertObjectToArray from '../../lib/convertObjectToArray.js';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ModalConfirmButton } from '../../components/buttons.js';

function UserPage({ collectionData, presetData }) {
    const router = useRouter();
    const { username } = router.query;
    return (<Layout>
        <div className={utilStyles.centre}>
            <h1>Hello {username}</h1>
        </div>
        <UserInfo username={username}/>
        <hr/>
        <section>
            <h2>Generate Practice Test</h2>
            <h3>Select Preset</h3>
            {newPreset(username)}
            <div>
                {PresetList(presetData, username)}
            </div>
            <h3>Select Questions</h3>
            <div>
                {newCollection(username)}
                {CollectionList(username, collectionData)}
            </div>
            <form>
                <input type="submit" value="Generate Practice Test"/>
            </form>
        </section>
    </Layout>);
}

export async function getServerSideProps(context) {
    // fetch data from external API
    const url = 'http://localhost:3001/api/user/' + context.params.username;
    const requestOptions = {
        method: 'GET'
    };
    const fetchResult = await fetch(url, requestOptions);
    const jsonOfResult = await fetchResult.json();
    const collectionData = jsonOfResult.data.collectionData;
    const presetData = jsonOfResult.data.presetData;
    // Pass data to the page via props
    return { props: { collectionData, presetData } };
}

function newPreset(username) {
    const [isOpen, setOpen] = useState(false);
    return (<>
        <button onClick={() => setOpen(true)}>New Preset</button>
        {isOpen && <NewPresetModal setOpen={setOpen} username={username}/>}
    </>);
};

function PresetList(presets, username) {
    if (Object.keys(presets).length === 0) {
        return ;
    };
    return (
        <table key="preset-table">
            <tbody key="preset-tbody">
                <tr key="preset-heading">
                    <th>Select</th>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {presets.map(({ id, name, preamble, sep, postamble }) => {
                    return (
                        <tr>
                            <td><input type="radio" name="preset-selection"/></td>
                            <td>{name}</td>
                            <td>{editPreset(username, id, name, preamble, sep, postamble)}</td>
                            <td>{deletePreset(username, id, name)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

function editPreset(username, presetID, presetName, presetPreamble, presetSep, presetPostamble) {
    const [isOpen, setOpen] = useState(false);
    const presetData = {
        owner: username,
        id: presetID,
        name: presetName,
        preamble: presetPreamble,
        sep: presetSep,
        postamble: presetPostamble
    };
    return (<>
        <button onClick={() => setOpen(true)}>Edit</button>
        {isOpen && <EditPresetModal setOpen={setOpen} presetData={presetData}/>}
    </>);
};

function deletePreset(username, presetID, presetName) {
    const [isOpen, setOpen] = useState(false);
    const presetData = {
        owner: username,
        id: presetID,
        name: presetName
    };
    return (<>
        <button onClick={() => setOpen(true)}>Delete</button>
        {isOpen && <DeletePresetModal setOpen={setOpen} presetData={presetData}/>}
    </>);
};

function newCollection(username) {
    const [isOpen, setOpen] = useState(false);
    return (<>
        <button type="button" onClick={() => setOpen(true)}>New Collection</button>
        {isOpen && <NewCollectionModal setOpen={setOpen} username={username}/>}
    </>);
};

function CollectionList(username, collections) {
    if (Object.keys(collections).length === 0) {
        return ;
    };
    return (
        <ul>
            {collections.map(({ id, name, subCollections }) => {
                return (
                    <li key={id}>{name}&nbsp;&nbsp;
                        {renameCollection(username, id, name)}&nbsp;
                        {deleteCollection(username, id, name)}&nbsp;
                        {newSubCollection(id, name)}
                        {SubCollectionList(username, subCollections)}
                    </li>
                );
            })}
        </ul>
    );
};

function renameCollection(collectionOwner, collectionID, collectionName) {
    const [isOpen, setOpen] = useState(false);
    const collectionData = {
        owner: collectionOwner,
        id: collectionID,
        name: collectionName
    }
    return (<>
        <button type="button" onClick={() => setOpen(true)}>Rename</button>
        {isOpen && <RenameCollectionModal setOpen={setOpen} collectionData={collectionData}/>}
    </>);
};

function deleteCollection(username, collectionID, collectionName) {
    const [isOpen, setOpen] = useState(false);
    const collectionData = {
        owner: username,
        id: collectionID,
        name: collectionName
    };
    return (<>
        <button onClick={() => setOpen(true)}>Delete</button>
        {isOpen && <DeleteCollectionModal setOpen={setOpen} collectionData={collectionData}/>}
    </>);
};

function newSubCollection(collectionID, collectionName) {
    const [isOpen, setOpen] = useState(false);
    return (<>
        <button type="button" onClick={() => setOpen(true)}>New Subcollection</button>
        {isOpen && <NewSubCollectionModal setOpen={setOpen} collectionID={collectionID} collectionName={collectionName}/>}
    </>);
};

function SubCollectionList(username, subCollections) {
    if (Object.keys(subCollections).length === 0) {
        return ;
    };
    return (
        <ul>
            {subCollections.map(({ id, name, questions }) => {
                return (
                    <li key={id}>
                        <input 
                            type="number" 
                            min="0" 
                            defaultValue="0" 
                            step="1" 
                            style={{width: "3em"}}/> {name}&nbsp;&nbsp;
                        {renameSubCollection(id, name)}&nbsp;&nbsp;
                        {deleteSubCollection(id, name)}&nbsp;&nbsp;
                        {genNewQuestion(username, id, name)}&nbsp;&nbsp;
                        <button type="button">Show Questions</button>
                        {questionList(id, name, questions)}
                    </li>
                );}
            )}
        </ul>
    );
};

function renameSubCollection(subCollectionID, subCollectionName) {
    const [isOpen, setOpen] = useState(false);
    const subCollectionData = {
        id: subCollectionID,
        name: subCollectionName
    }
    return (<>
        <button type="button" onClick={() => setOpen(true)}>Rename</button>
        {isOpen && <RenameSubCollectionModal setOpen={setOpen} subCollectionData={subCollectionData}/>}
    </>);
};

function deleteSubCollection(subCollectionID, subCollectionName) {
    const [isOpen, setOpen] = useState(false);
    const subCollectionData = {
        id: subCollectionID,
        name: subCollectionName
    };
    return (<>
        <button onClick={() => setOpen(true)}>Delete</button>
        {isOpen && <DeleteSubCollectionModal setOpen={setOpen} subCollectionData={subCollectionData}/>}
    </>);
};

function genNewQuestion(username, subCollectionID, subCollectionName) {
    const [isOpen, setOpen] = useState(false);

    return (<>
        <button type="button" onClick={() => setOpen(true)}>New Question</button>
        {isOpen && <NewQuestionModal setOpen={setOpen} username={username} subCollectionID={subCollectionID} subCollectionName={subCollectionName}/>}
    </>);
};

function questionList(subCollectionID, subCollectionName, questions) {
    if (Object.keys(questions).length === 0) {
        return ;
    };
    return (
        <ul>
            {questions.map(({ id, name, content, source }) => {
                return (
                    <li key={id}>{name} &nbsp;&nbsp; 
                        {editQuestion(subCollectionName, id, name, content, source)}&nbsp;&nbsp;
                        {deleteQuestion(subCollectionID, id, name)}
                    </li>
                );}
            )}
        </ul>
    );
};

function editQuestion(subCollectionName, questionID, questionName, questionContent, questionSource) {
    const [isOpen, setOpen] = useState(false);
    const questionData = {
        owner: subCollectionName,
        id: questionID,
        name: questionName,
        content: questionContent,
        source: questionSource
    };
    return (<>
        <button onClick={() => setOpen(true)}>Edit</button>
        {isOpen && <EditQuestionModal setOpen={setOpen} questionData={questionData}/>}
    </>);
};

function deleteQuestion(ownerID, questionID, questionName) {
    const [isOpen, setOpen] = useState(false);
    const questionData = {
        id: questionID,
        name: questionName
    };
    return (<>
        <button onClick={() => setOpen(true)}>Delete</button>
        {isOpen && <DeleteQuestionModal setOpen={setOpen} subCollectionID={ownerID} questionData={questionData}/>}
    </>);
};

export default UserPage
