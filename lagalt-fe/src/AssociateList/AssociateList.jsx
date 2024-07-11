import AssociateCard from "./AssociateCard";
import PropTypes from 'prop-types';


function AssociateList({ associates }) {

    return (
        <>
        <h3>Associates:</h3>
            {associates.map((associate, index) => (
                <AssociateCard key={index} associate={associate} />
            ))}
        </>
    )
}

AssociateList.propTypes = {
    associates: PropTypes.array.isRequired
};

export default AssociateList;