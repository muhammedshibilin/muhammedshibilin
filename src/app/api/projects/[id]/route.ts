/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    _: Request,
    { params }: { params: { id: string } }
) {
    try {
        const project = await prisma.project.findUnique({
            where: { id: params.id },
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch project" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();

        const updatedProject = await prisma.project.update({
            where: { id: params.id },
            data: {
                title: body.title,
                description: body.description,
                detailedDescription: body.detailedDescription,
                technologies: body.technologies,
                features: body.features,
                challenges: body.challenges,
                solutions: body.solutions,
                liveUrl: body.liveUrl,
                githubUrl: body.githubUrl,
                imageUrl: body.imageUrl,
                role: body.role,
            },
        });

        return NextResponse.json(updatedProject);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update project" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.project.delete({
            where: { id: params.id },
        });

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete project" },
            { status: 500 }
        );
    }
}