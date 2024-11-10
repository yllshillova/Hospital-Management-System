using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Doctors
{
    public class Details
    {
        public record GetDoctorByIdQuery(Guid Id) : IRequest<Result<DoctorDto>>;

        public class GetDoctorByIdQueryHandler(IDoctorRepository _doctorRepository, IMapper _mapper) : IRequestHandler<GetDoctorByIdQuery, Result<DoctorDto>>
        {
            public async Task<Result<DoctorDto>> Handle(GetDoctorByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var doctor = await _doctorRepository.GetByIdAsync(request.Id);
                    if (doctor is null) return Result<DoctorDto>.Failure(ErrorType.NotFound, "No records could be found!");

                    var doctorDto = _mapper.Map<DoctorDto>(doctor);
                    if (doctorDto is null) return Result<DoctorDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                    return Result<DoctorDto>.Success(doctorDto);
                }
                return Result<DoctorDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
