import PropTypes from 'prop-types';

function AssociateCard({associate}) {

    return (
        <>
            <p>ID: {associate.id}</p>
            <p>User ID: {associate.userId}</p>
            <p>Owner: {associate.owner.toString()}</p>
            <p>Visitor: {associate.visitor.toString()}</p>
            <p>Applicant: {associate.applicant.toString()}</p>
            <p>Collaborator: {associate.collaborator.toString()}</p>
        </>
    )
}

AssociateCard.propTypes = {
    associate: PropTypes.object.isRequired
};


export default AssociateCard;