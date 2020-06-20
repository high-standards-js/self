const base = require('@high-standards-js/base');
const release = require('@high-standards-js/github-action-release');
    
(async() => {
    await base.checkAcceptedHighStandards();
    let workflowObject = release.getWorkflowFileObject('release');
    workflowObject = release.addStep(
        workflowObject, 
        'release',
        'npmrc', 
        200.0,
        {
            run: 'echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" >> .npmrc',
        }
    );
    workflowObject = release.addStep(
        workflowObject, 
        'release',
        'Install dependencies', 
        300.0,
        {
            run: 'npm install',
            env: {
                GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
                NPM_TOKEN: '${{ secrets.GITHUB_TOKEN }}'
            }
        }
    );
    release.saveWorkflowFileObject(workflowObject, 'release');
})();