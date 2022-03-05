const React = require('react');
// const DefaultLayout = require('../Default.jsx')

class Index extends React.Component {
    render() {
        const { reviews } = this.props;
        return(
                <div>
                    {
                        reviews.map((review) => (
                            <article>
                                <a href={`/reviews/${review._id }`}>
                                    <h3>{review.name}</h3><br/>
                                    <h3>{review.description}</h3><br/>
                                    <h3>{review.rating}</h3><br/>
                                </a>
                            </article>
                        ))
                    }
                </div>
        )
    }
};

module.exports = Index;