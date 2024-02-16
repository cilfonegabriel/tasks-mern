import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
    {
        name: {
            type: 'string',
            trim: true,
            required: true,
        },
        description: {
            type: 'string',
            trim: true,
            required: true,
        },
        deliverDate: {
            type: 'date',
            default: Date.now(),
        },
        customer: {
            type: 'string',
            trim: true,
            required: true,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task',
            }
        ],
        collaborators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;