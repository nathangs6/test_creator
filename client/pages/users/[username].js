import Layout from '../../components/layout.js';
import UserInfo from '../../components/userInfo.js';
import utilStyles from '../../styles/utils.module.css';
import convertObjectToArray from '../../lib/convertObjectToArray.js';
import { useRouter } from 'next/router'

function UserPage({ collectionData, presetData }) {
    const router = useRouter();
    const { username } = router.query;
    return (<Layout>
        <div className={utilStyles.centre}>
            <h1>Hello {username}</h1>
        </div>
        <UserInfo/>
        <hr/>
        <section>
            <h2>Generate Practice Test</h2>
            <h3>Select Preset</h3>
            <div>
                {PresetList(presetData)}
            </div>
            <h3>Select Questions</h3>
            <div>
                <form>
                    <input type="submit" value="Add new collection"/>
                </form>
                {CollectionList(collectionData)}
            </div>
            <form>
                <input type="submit" value="Generate Practice Test"/>
            </form>
        </section>
    </Layout>);
}

export async function getServerSideProps(context) {
    // fetch data from external API
    const requestOptions = {
        method: 'GET',
    };
    const res = await fetch('http://localhost:3000/api/testUserData', requestOptions);
    const fetchData = await res.json();
    const collectionData = fetchData.collectionData;
    const presetData = fetchData.presetData;
    // Pass data to the page via props
    return { props: { collectionData, presetData } };
}

function PresetList(presets) {
    if (Object.keys(presets).length === 0) {
        return ;
    };
    return (
        <table key="preset-table">
            <tbody key="preset-tbody">
                <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {convertObjectToArray(presets).map(({ name }) => {
                    return (
                        <tr>
                            <td><input type="radio" name="preset-selection"/></td>
                            <td>{name}</td>
                            <td><button type="button">Edit</button></td>
                            <td><button type="button">Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

function CollectionList(collections) {
    if (Object.keys(collections).length === 0) {
        return ;
    };
    return (
        <ul>
            {convertObjectToArray(collections).map(({ id, name, subCollections }) => {
                return (
                    <li key={id}>{name} <button type="button">Edit</button> <button type="button">Add Subcollection</button>
                        {SubCollectionList(subCollections)}
                    </li>
                );
            })}
        </ul>
    );
};

function SubCollectionList(subCollections) {
    if (Object.keys(subCollections).length === 0) {
        return ;
    };
    return (
        <ul>
            {convertObjectToArray(subCollections).map(({ id, name, questions }) => {
                return (
                    <li key={id}><input type="number" min="0" defaultValue="0" step="1" style={{width: "3em"}}/> {name} <button type="button">Edit</button> <button type="button">Show Questions</button>
                        {questionList(questions)}
                    </li>
                );}
            )}
        </ul>
    );
};

function questionList(questions) {
    if (Object.keys(questions).length === 0) {
        return ;
    };
    return (
        <ul>
            {convertObjectToArray(questions).map(({ id, name }) => {
                return (
                    <li key={id}>{name} <button type="button">Edit</button> <button type="button">Delete</button></li>
                );}
            )}
        </ul>
    );
};

export default UserPage
