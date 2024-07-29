
import React from 'react';
import Link from 'next/link';

const HomePage = () => {
    return (
        <div>
            <h1>CPRG 306: Web Development 2 - Assignments</h1>
            <p>
                <Link href="https://github.com/miebaka94/cprg306-assignments.git"legacyBehavior>
                    <a>Go to Week 2 Assignment</a>
                </Link>
            </p>
        </div>
    );
};

export default HomePage;
