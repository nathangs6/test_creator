import Head from 'next/head';

const siteTitle = 'Practice Test Generator';

export default function Header() {
    return (<>
            <Head>
                <link rel="icon" type="image/x-icon" href="images/favicon.png" />
                <meta
                    name="description"
                    content="An app you can use to create practice tests in preparation for exams."
                />
                <title>{siteTitle}</title>
            </Head>
    </>);
}

