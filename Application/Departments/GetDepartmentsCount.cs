using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Departments
{
    public class GetDepartmentsCount
    {
        public record GetVistsCountQuery : IRequest<Result<int>>;

        public class GetDepartmentsCountQueryHandler(IDepartmentRepository _doctorRepository) : IRequestHandler<GetVistsCountQuery, Result<int>>
        {
            public async Task<Result<int>> Handle(GetVistsCountQuery request, CancellationToken cancellationToken)
            {
                var departments = await _doctorRepository.GetAllAsync();
                if (departments is null || !departments.Any()) return Result<int>.Failure(ErrorType.NotFound, "No department found.");

                var departmentsCount = departments.Count();
                return Result<int>.Success(departmentsCount);

            }
        }
    }
}
